import { Box, Flex } from '@chakra-ui/react';

import PageHeading from '../PageHeading/PageHeading';
import PageHeaderLink from '../PageHeaderLink/PageHeaderLink';
import Blockquote from '../Blockquote/Blockquote';
import PageNavigation from '../PageNavigation/PageNavigation';
import * as shapes from '../../commons/shapes';

function PageHeader(props) {
  const { routeConfig, ...otherProps } = props;
  return (
    <Box mb="8" {...otherProps}>
      <Flex
        mb="8"
        direction={{ base: 'column', sm: 'row' }}
        align={{ base: 'auto', sm: 'center' }}
        justify={{ base: 'auto', sm: 'space-between' }}>
        <PageHeading routeConfig={routeConfig} mb={{ base: '2', sm: '0px' }} />
        <PageNavigation routeConfig={routeConfig} />
      </Flex>
      <PageHeaderLink routeConfig={routeConfig} />
      <Blockquote cite={routeConfig.externalLink}>
        {routeConfig.citation}
      </Blockquote>
    </Box>
  );
}

PageHeader.propTypes = {
  routeConfig: shapes.routeConfig,
};

export default PageHeader;
